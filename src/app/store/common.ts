import { environment } from '../../environments/environment';

export const shouldLoad = ({ reload, now, fetchTime}: { reload: boolean, now: number, fetchTime: number | undefined }) =>
  reload || !fetchTime || now - fetchTime > environment.apiInterval;
