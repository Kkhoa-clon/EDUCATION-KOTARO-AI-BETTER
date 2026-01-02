/**
 * NASA API SERVICE
 * 
 * Mục đích: Xử lý tích hợp với NASA APIs
 * 
 * Chức năng cần implement:
 * 1. Lấy ảnh thiên văn trong ngày (APOD - Astronomy Picture of the Day)
 * 2. Lấy ảnh từ Mars Rover (Spirit, Opportunity, Curiosity, Perseverance)
 * 3. Lấy dữ liệu về các hành tinh, tiểu hành tinh
 * 4. Cache dữ liệu để giảm số lần gọi API
 * 
 * API Endpoints cần tạo:
 * - GET /api/nasa/apod?date=YYYY-MM-DD - Lấy ảnh APOD
 * - GET /api/nasa/mars-photos?rover=curiosity&sol=1000 - Lấy ảnh Mars
 * - GET /api/nasa/asteroids - Lấy dữ liệu tiểu hành tinh
 * 
 * Environment Variables cần:
 * - NASA_API_KEY: API key từ https://api.nasa.gov/
 * 
 * Tài liệu tham khảo:
 * - https://api.nasa.gov/
 * - https://api.nasa.gov/#apod
 * - https://api.nasa.gov/#mars-photos-api
 */

// TODO: Implement NASA API Service
// 1. Setup NASA API client
// 2. Implement APOD fetching
// 3. Implement Mars photos fetching
// 4. Add caching mechanism
// 5. Add error handling

export class NasaService {
  // TODO: Implement constructor với API key
  constructor() {
    // Initialize NASA API client
  }

  // TODO: Implement APOD method
  async getAPOD(date?: string): Promise<any> {
    // Fetch Astronomy Picture of the Day
    // Return image URL, title, explanation
    throw new Error('Not implemented yet');
  }

  // TODO: Implement Mars photos method
  async getMarsPhotos(rover: string, sol?: number, earthDate?: string): Promise<any[]> {
    // Fetch Mars Rover photos
    // Return array of photo objects
    throw new Error('Not implemented yet');
  }

  // TODO: Implement asteroids method
  async getAsteroids(startDate: string, endDate: string): Promise<any> {
    // Fetch near-Earth asteroids data
    // Return asteroids information
    throw new Error('Not implemented yet');
  }
}
