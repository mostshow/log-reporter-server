
import express from 'express'

let router = express.Router();
import CertMiddleWare from '../common/cert';
import report from '../controller/report'
//report
//
router.use('/report/log',report.log);
router.use('/report/login',report.login);
router.use('/report/getLog', CertMiddleWare.userRequired, report.getLog)
router.use('/report/getSourceMap', CertMiddleWare.userRequired, report.getSourceMap)

export default router;

