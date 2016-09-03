import * as angular from 'angular';
import { ICustomStateParamsService } from './icustomstateparamsservice';

export interface ICustomStateService extends angular.ui.IStateService {
    params: ICustomStateParamsService;
};
