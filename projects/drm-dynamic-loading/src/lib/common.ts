export class LoadingEvent {
  action: LoadingAction;
  component: string;
}

export type LoadingCallback = (event: LoadingEvent) => void;
export enum LoadingAction { START = 'START', STOP = 'STOP' }
export const globalMetaComponent = '___GLOBAL_COMPONENT___';
