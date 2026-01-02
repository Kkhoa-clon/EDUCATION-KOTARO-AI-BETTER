import express, { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { NasaService } from '../services/nasaService';

const router = express.Router();
const nasaService = new NasaService();

// Rate limiting: 30 requests per 15 minutes
const nasaLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: 'Quá nhiều yêu cầu. Vui lòng thử lại sau 15 phút.'
});

// GET /api/nasa/rovers
router.get('/rovers', nasaLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rovers = await nasaService.getRovers();
    res.json({
      status: 'success',
      data: rovers
    });
  } catch (error: any) {
    next(error);
  }
});

// GET /api/nasa/photos
router.get('/photos', nasaLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { rover, camera, earth_date, sol } = req.query;

    const photos = await nasaService.getPhotos({
      rover: rover as string,
      camera: camera as string | undefined,
      earth_date: earth_date as string | undefined,
      sol: sol ? parseInt(sol as string) : undefined
    });

    res.json({
      status: 'success',
      data: photos
    });
  } catch (error: any) {
    next(error);
  }
});

// GET /api/nasa/photos-by-date - Lấy ảnh từ nhiều rovers theo ngày
router.get('/photos-by-date', nasaLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { rovers, earth_date } = req.query;

    if (!rovers || !earth_date) {
      return res.status(400).json({
        status: 'error',
        message: 'Rovers và earth_date là bắt buộc'
      });
    }

    const roversArray = Array.isArray(rovers) ? rovers as string[] : [rovers as string];
    const result = await nasaService.getPhotosByDate({
      rovers: roversArray,
      earth_date: earth_date as string
    });

    res.json({
      status: 'success',
      data: result
    });
  } catch (error: any) {
    next(error);
  }
});

// GET /api/nasa/nearest-date-photos - Tìm ảnh ở ngày gần nhất
router.get('/nearest-date-photos', nasaLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { rovers, earth_date, min_date, max_date } = req.query;

    if (!rovers || !earth_date || !min_date || !max_date) {
      return res.status(400).json({
        status: 'error',
        message: 'Rovers, earth_date, min_date và max_date là bắt buộc'
      });
    }

    const roversArray = Array.isArray(rovers) ? rovers as string[] : [rovers as string];
    const result = await nasaService.getNearestDatePhotos({
      rovers: roversArray,
      earth_date: earth_date as string,
      minDate: min_date as string,
      maxDate: max_date as string
    });

    res.json({
      status: 'success',
      data: result
    });
  } catch (error: any) {
    next(error);
  }
});

export default router;
