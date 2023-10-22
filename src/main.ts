import 'zone.js/dist/zone';
import {
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  HttpClient,
  HttpClientModule,
  HttpEventType,
} from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="container">
      <h3 class="container">Controlled Image Load Demo</h3>
      <div class="container" id="imagePlaceHolder" [ngStyle]="{ 'background-image': 'url(' +imageDataUrl+ ')' }">
      </div>
      <div> 
        <p><b>Progress :</b> {{loaderValueToShow}}</p>
        <p><b>Total Size :</b> {{totalSizeToShow | number: '1.2-2'}} mb</p>
      </div>
    </div>
  `,
  styles: [
    `
      .container{
        display: grid;
        justify-content: center;
        align-items: center; 
      }
      #imagePlaceHolder{
        width: 300px;
        height: 300px;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        box-shadow: 0 8px 8px rgba(0, 0, 0, 0.5);
        border-radius: 8px;
      }
    `,
  ],
})
export class App implements OnInit, AfterViewInit {
  public imageUrl =
    'https://media.istockphoto.com/id/153899236/photo/grunge-ornate-wallpaper.jpg?s=612x612&w=0&k=20&c=6vd552HgoW1WJhzoGeF3xdeF-bWGBVpnDXA_IQalK7g=';
  // Two Formats
  // public imageUrl =
  // 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'; //SMALL ONE
  // public imageUrl =
  // 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg'; // BIG ONE
  public loaderValueToShow: number = 0;
  public totalSizeToShow: number = 0;
  public imageDataUrl: string | ArrayBuffer | undefined =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANkAAADoCAMAAABVRrFMAAAAIVBMVEUtLS1CQkIyMjI/Pz83NzcvLy8rKytEREQ7Ozs9PT00NDR2FmXVAAAEMElEQVR4nO2ciXakIBBF2QqQ///gAdRuFzg9KkqZ8+4kOdNJD+MVZCmoCAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAF4I5U9qzVhwR61b//v+ekoF1Zyg7r1tP62ECF46J1vjYpnadHQjGmTWcukjf/n8ZXol//OV2//MabKd5Czp9tW1Qtk+ZjeLxfrTqk8v4m+usSjnu4jR3V5JTXXwsssqu6v23NCjExlushmVppulH9eiVWNM1+Fa8m0Ej1fZykwP8U9TvvesQ2NcmMVhZzPwXBuH4kApv3X2fK0tzG4tm6HZ+Uktb7MrF8TbTNCfrDPldRoG9BBOXRdTMyvUkFdY4zrrzDKLqZnwq8mWG+jwGMDUzMdWKKd1ZP7Qh0cFnmbefWd904pbH704lmZG7okN8tjlcTSj4oLGmQtl8zCzlXX2wcUIPzMStUVoOF82CzOhSlapS/Hny+ZhFmphg+F82TzM6uGsQ6M1S7Oa2uvNalX2erPSOJ051u0zNAu1yOPr+8ZqqP/141ltDiIvlM3DTCgn3bZFxm+YSgdC5ZACR7PY7+utWlyvXSmbhRnlJ203prlaNISU8d7vn0GOZikq7jbdiKt1HyHfBbffJeNnNv5gLeakKQbobBjm9zkd1s8hT7NYa2bpNVTirGF5AzbxBJ5mCeV1bmZxjl9riWYT4BLLqDJfM2EFBWOCIlu5MLPy2sYTmJrR9GnnFwX8dP5jFossH0WmZmKSmw0LFGYqzttXtMbxHbVYXDFyp1cRMI5mRL82zsohhVhp5bLZmMUrmfqPQMWt2LCbWE5wb43pAF06UJGuvrTLFIpWedpcLpuN2SpkECfDZtWT2DxAl5uj/hzWZGo2rGbE0S3kAWB8+EL1FFqcQqpi2TzMyNLcEueKiJcc2+TYO1A9tpX+jS+WzcKM8lBVGKy0jx2K8bUoyYQmvq3RmlrH56TcL9y27wmlsnmYkb5ybO7TO/Izs8Ol49JOs22NarucPqqmCmWzMPvVRfw0M0zNirtnh8ymI6i8zOJ0sb5f8d8Uyu5u1qDKPg8aLzOqRr6PmBmGZkJc9vrsZ7Myo/oe9REzzc8sjtLXveYT0bzM2qRcjFNHXmbVIMAxPD+zRvk/Az8zapXJys5MVOOmF8t+2IwKs6uGpfetM72rs3Zly/k46+MZP7S5r23zMRcJpE49X2XLXKbmuDmXuUMuEy1ao2yefvalQ/6ZWCSJycZ8C3w+ZzCqVQNwLQ3983melNPf7lVzN3S7P73SF3N3laXlWp+E6rtTxd3Q65cy3Jjen3foD2edNBPL54bHgH1jkpc7dl68tVvwlyL51SpLSXkdf6fLuLIP5gbO5Rq+hr9tBwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACa8Q+nvzGcEJ0CsQAAAABJRU5ErkJggg==';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('App Component Initialized', new Date().toString());
  }

  ngAfterViewInit(): void {
    console.log('App Component Loaded', new Date().toString());
    console.log('Image Load Begun : ', new Date().toString());
    this.getImageData().subscribe({
      next: (response) => {
        this.loaderValueToShow = response.progress;
        if (this.totalSizeToShow == 0 && response.totalSize != 0) {
          this.totalSizeToShow = response.totalSize / (1024 * 1024);
        }
        if (response.progress - this.loaderValueToShow > 5) {
          console.log(
            'Image Load Progress : ',
            new Date().toString(),
            response.progress,
            response.totalSize
          );
          // this.loaderValueToShow = response.progress;
        }
        if (response.progress == 100) {
          // this.loaderValueToShow == 100;
          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result != null) {
              this.imageDataUrl = reader.result;
              console.log(
                'Image Load Progress Complete : ',
                new Date().toString(),
                this.imageDataUrl
              );
            }
          };
          reader.readAsDataURL(response.data);
        }
      },
      complete: () => {
        console.log('Image Load Complete : ', new Date().toString());
      },
    });
  }

  getImageData(): Observable<{
    data: Blob;
    progress: number;
    totalSize: number;
  }> {
    return this.http
      .get(this.imageUrl, {
        responseType: 'blob',
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event: any) => {
          if (event.type === HttpEventType.DownloadProgress) {
            let curProgress = Math.round(
              100 * (event.loaded / (event.total || 1000000))
            );
            return {
              data: new Blob(),
              progress: curProgress,
              totalSize: event.total,
            };
          } else if (event.type === HttpEventType.Response) {
            return {
              data: event.body as Blob,
              progress: 100,
              totalSize: event.total,
            };
          }
          return { data: new Blob(), progress: 0, totalSize: 0 };
        })
      );
  }
}

bootstrapApplication(App);
