import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../../store/state';
import { loadForecast } from '../../store/forecast/forecast.actions';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  name$: Observable<string>;
  id: number;
  forecast$: Observable<any>;

  constructor(private route: ActivatedRoute, private store: Store<State>) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.name$ = this.store.select(state => state.weather.current.find(item => item.id === this.id).name);
    this.forecast$ = this.store.select(state => ({ forecast: state.forecast[this.id], loading: state.forecast.loading }));
    this.loadForecast();
  }

  loadForecast(reload = false) {
    this.store.dispatch(loadForecast({ id: this.id, reload }));
  }

  getHour = (unixTimeStamp: number) =>
    new Intl.DateTimeFormat('en', {  hour: 'numeric' }).format(unixTimeStamp * 1000)

  getDayMonth = (unixTimeStamp: number) => this.formatDateTime(unixTimeStamp, { day: 'numeric', month: 'numeric' });

  formatDateTime = (unixTimeStamp: number, options?: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('en', options).format(unixTimeStamp * 1000)

  }
