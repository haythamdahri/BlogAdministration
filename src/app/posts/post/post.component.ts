import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../models/post.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {


  constructor() {
  }

  ngOnInit() {
  }

}
