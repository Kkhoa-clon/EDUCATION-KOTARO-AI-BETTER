import dotenv from 'dotenv';

dotenv.config();

// API key từ robot-sao-hoa.js của dự án cũ
const NASA_API_KEY = process.env.NASA_API_KEY || 'ysbG3e9XHdLDfuOnLunTCJoTHIzGeMiHtdMy4eNj';
const NASA_BASE_URL = 'https://api.nasa.gov/mars-photos/api/v1';

if (!NASA_API_KEY) {
  console.warn('⚠️ NASA_API_KEY chưa được cấu hình trong .env');
}

export interface Rover {
  id: number;
  name: string;
  landing_date: string;
  launch_date: string;
  status: string;
  max_sol: number;
  max_date: string;
  total_photos: number;
  cameras: Array<{
    name: string;
    full_name: string;
  }>;
}

export interface Photo {
  id: number;
  sol: number;
  camera: {
    id: number;
    name: string;
    rover_id: number;
    full_name: string;
  };
  img_src: string;
  earth_date: string;
  rover: {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
  };
}

export class NasaService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = NASA_API_KEY || '';
    this.baseUrl = NASA_BASE_URL;
  }

  async getRovers(): Promise<Rover[]> {
    if (!this.apiKey) {
      throw new Error('NASA_API_KEY chưa được cấu hình');
    }

    const response = await fetch(`${this.baseUrl}/rovers/?api_key=${this.apiKey}`);

    if (!response.ok) {
      throw new Error('Lỗi khi gọi NASA API');
    }

    const data = await response.json();
    return data.rovers || [];
  }

  async getPhotos(params: {
    rover: string;
    camera?: string;
    earth_date?: string;
    sol?: number;
  }): Promise<Photo[]> {
    if (!this.apiKey) {
      throw new Error('NASA_API_KEY chưa được cấu hình');
    }

    if (!params.rover) {
      throw new Error('Rover là bắt buộc');
    }

    const queryParams = new URLSearchParams({
      api_key: this.apiKey,
      ...(params.camera && { camera: params.camera }),
      ...(params.earth_date && { earth_date: params.earth_date }),
      ...(params.sol && { sol: params.sol.toString() })
    });

    const response = await fetch(
      `${this.baseUrl}/rovers/${params.rover}/photos?${queryParams.toString()}`
    );

    if (!response.ok) {
      throw new Error('Lỗi khi lấy ảnh từ NASA API');
    }

    const data = await response.json();
    return data.photos || [];
  }

  /**
   * Lấy ảnh từ nhiều rovers theo ngày (logic từ robot-sao-hoa.js)
   */
  async getPhotosByDate(params: {
    rovers: string[];
    earth_date: string;
  }): Promise<{ photos: Photo[]; roversWithPhotos: Array<{ roverName: string; cameras: string[] }> }> {
    if (!this.apiKey) {
      throw new Error('NASA_API_KEY chưa được cấu hình');
    }

    if (!params.rovers || params.rovers.length === 0) {
      throw new Error('Rovers là bắt buộc');
    }

    if (!params.earth_date) {
      throw new Error('Earth date là bắt buộc');
    }

    // Tạo các URL cho từng rover
    const urls = params.rovers.map((rover) => {
      const queryParams = new URLSearchParams({
        earth_date: params.earth_date,
        api_key: this.apiKey,
      });
      return `${this.baseUrl}/rovers/${rover}/photos?${queryParams.toString()}`;
    });

    // Fetch tất cả rovers song song
    const fetchPromises = urls.map(async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          return null;
        }
        return response.json();
      } catch (err) {
        console.error(`Lỗi khi lấy ảnh từ URL ${url}:`, err);
        return null;
      }
    });

    const data = await Promise.all(fetchPromises);

    let allPhotos: Photo[] = [];
    const roversWithPhotos: Array<{ roverName: string; cameras: string[] }> = [];

    data.forEach((roverData, index) => {
      if (roverData && roverData.photos && roverData.photos.length > 0) {
        allPhotos = allPhotos.concat(roverData.photos);

        // Tạo đối tượng cho rover với danh sách camera
        const roverInfo = {
          roverName: params.rovers[index],
          cameras: [...new Set(roverData.photos.map((photo: Photo) => photo.camera.name))]
        };

        roversWithPhotos.push(roverInfo);
      }
    });

    return { photos: allPhotos, roversWithPhotos };
  }

  /**
   * Tìm ảnh ở ngày gần nhất khi không có ảnh cho ngày đã chọn (logic từ robot-sao-hoa.js)
   */
  async getNearestDatePhotos(params: {
    rovers: string[];
    earth_date: string;
    minDate: string;
    maxDate: string;
  }): Promise<{ photos: Photo[]; roversWithPhotos: Array<{ roverName: string; cameras: string[] }>; foundDate?: string }> {
    let newDate = new Date(params.earth_date);
    let direction = 1; // 1 là ngày tiếp theo, -1 là ngày trước đó
    let attempts = 0;
    const maxAttempts = 100;

    while (attempts < maxAttempts) {
      newDate.setDate(newDate.getDate() + direction);
      const adjustedDate = newDate.toISOString().split('T')[0];

      // Kiểm tra ngày có trong phạm vi không
      if (adjustedDate < params.minDate || adjustedDate > params.maxDate) {
        return { photos: [], roversWithPhotos: [] };
      }

      const result = await this.getPhotosByDate({
        rovers: params.rovers,
        earth_date: adjustedDate
      });

      if (result.photos.length > 0) {
        return { ...result, foundDate: adjustedDate };
      }

      attempts++;
      direction = direction === 1 ? -1 : 1; // Đổi hướng sau mỗi lần thử
    }

    return { photos: [], roversWithPhotos: [] };
  }
}
