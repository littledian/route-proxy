// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportManagement from '../../../app/controller/management';

declare module 'egg' {
  interface IController {
    management: ExportManagement;
  }
}
