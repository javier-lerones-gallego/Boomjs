import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }   from '@angular/router';
import { RouteNameService } from '../../services';

@Component({
  selector: 'me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  constructor(
    private routeNameService: RouteNameService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // Change the header title
    this.route.data.forEach(data => {
      this.routeNameService.name.next(data['title']);
    });
  }

}
