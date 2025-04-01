import { inject, Injectable } from '@angular/core';
import * as globalVars from '../../../global';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AllTagsResDto } from '../../models/tag/all-tags-res-dto/all-tags-res-dto.model';
import { AddTagDto } from '../../models/tag/add-tag-dto/add-tag-dto.model';
import { AddTagResDto } from '../../models/tag/add-tag-res-dto/add-tag-res-dto.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor() { }

  apiUrl: string = globalVars.domain + '/tag';
  private http: HttpClient = inject(HttpClient);

  getAllByUserId(userId: string): Observable<AllTagsResDto> {
    const fullApiUrl = this.apiUrl + `/getAll?userId=${userId}`;
    
    return this.http.get<AllTagsResDto>(fullApiUrl);
  }

  addTag(addTag: AddTagDto): Observable<AddTagResDto> {
    const fullApiUrl = this.apiUrl + "/add";

    return this.http.post<AddTagResDto>(fullApiUrl, addTag);
  }

}
