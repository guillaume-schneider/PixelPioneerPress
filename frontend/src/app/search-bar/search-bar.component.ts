import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchText: string = '';
  searchDebouncer = new Subject<string>();

  constructor(private router: Router) {
    this.searchDebouncer.pipe(debounceTime(300)).subscribe(value => {
      this.router.navigate(['/search-results'], { queryParams: { query: value } });
    });
  }

  onSearchChange(value: string) {
    if (value.trim()) {
      this.searchDebouncer.next(value);
    }
  }

  ngOnInit(): void {
  }
}
