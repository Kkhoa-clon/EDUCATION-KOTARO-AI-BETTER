/**
 * NASA API ROUTES
 * 
 * Mục đích: Định nghĩa các API endpoints cho NASA APIs
 * 
 * Routes:
 * - GET /api/nasa/apod?date=YYYY-MM-DD - Lấy ảnh thiên văn trong ngày
 * - GET /api/nasa/mars-photos?rover=curiosity&sol=1000 - Lấy ảnh Mars Rover
 * - GET /api/nasa/asteroids?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD - Lấy dữ liệu tiểu hành tinh
 * 
 * Middleware cần:
 * - Rate limiting: Giới hạn số request
 * - Caching: Cache responses để giảm API calls
 * 
 * TODO: Implement routes
 * 1. Import NasaService
 * 2. Setup caching middleware (optional)
 * 3. Create GET /apod route
 * 4. Create GET /mars-photos route
 * 5. Create GET /asteroids route
 * 6. Add error handling
 */

import express, { Request, Response, NextFunction } from 'express';
// import { NasaService } from '../services/nasaService';

const router = express.Router();
// const nasaService = new NasaService();

// TODO: GET /api/nasa/apod
// router.get('/apod', async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { date } = req.query;
//     // Validate date format
//     // Call nasaService.getAPOD()
//     // Return APOD data
//   } catch (error) {
//     next(error);
//   }
// });

// TODO: GET /api/nasa/mars-photos
// router.get('/mars-photos', async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { rover, sol, earth_date } = req.query;
//     // Validate parameters
//     // Call nasaService.getMarsPhotos()
//     // Return photos array
//   } catch (error) {
//     next(error);
//   }
// });

// TODO: GET /api/nasa/asteroids
// router.get('/asteroids', async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { start_date, end_date } = req.query;
//     // Validate dates
//     // Call nasaService.getAsteroids()
//     // Return asteroids data
//   } catch (error) {
//     next(error);
//   }
// });

export default router;
