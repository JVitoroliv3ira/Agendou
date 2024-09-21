import {Component, OnInit} from '@angular/core';
import {VersionService} from "../../../core/services/api/version.service";
import {catchError, finalize, of} from "rxjs";
import {ApiResponse} from "../../../core/domain/dtos/responses/api-response";
import {LocalStorageUtils} from "../../../core/utils/local-storage.utils";

@Component({
  selector: 'agendou-application-version',
  templateUrl: './application-version.component.html',
})
export class ApplicationVersionComponent implements OnInit {
  public version = '';
  public loading = false;
  public errorOcurried = false;
  private errorMessage = 'Versão indisponível';
  private readonly versionKey = 'APPLICATION_VERSION';

  constructor(private versionService: VersionService) {
  }

  ngOnInit(): void {
    this.loadApplicationVersion();
  }

  private loadApplicationVersion(): void {
    const cachedVersion = LocalStorageUtils.get<string>(this.versionKey);

    if (cachedVersion) {
      this.version = cachedVersion;
      return;
    }
    this.fetchApplicationVersion();

  }

  private fetchApplicationVersion(): void {
    this.loading = true;
    this.versionService
      .getVersion()
      .pipe(
        finalize(() => (this.loading = false)),
        catchError(() => {
          this.errorOcurried = true;
          this.version = this.errorMessage;
          return of<ApiResponse<string>>({content: null, errors: null});
        })
      )
      .subscribe((res: ApiResponse<string>) => {
        this.version = res.content ?? this.errorMessage;
        if (res.content) {
          LocalStorageUtils.add<string>(this.versionKey, res.content);
        }
      });
  }
}
