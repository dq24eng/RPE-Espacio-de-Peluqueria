import { Router } from 'express';
import logger from '../utils/logger.utils.js';

const router = Router();

router.get('/', (req, res) => {
	logger.fatal('Fatal log');
	logger.error('Error log');
	logger.warn('Warning log');
	logger.info('Info log');
	logger.http('HTTP log');
	logger.debug('Debug log');
	return res.status(200).json({ status: 'success', message: 'Logs printed' });
});

export default router;