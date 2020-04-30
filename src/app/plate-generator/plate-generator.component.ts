import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ALL_COUNTRY } from '../shared/constant/CCountry';
import { ALL_REGION } from '../shared/constant/CRegion';
import { ICountry } from '../shared/interface/ICountry';
import { IRegion } from '../shared/interface/IRegion';
import { ElectronService } from 'ngx-electron';
import { OpenDialogOptions } from 'electron';

@Component({
    selector: 'app-plate-generator',
    templateUrl: './plate-generator.component.html',
    styleUrls: ['./plate-generator.component.scss']
})
export class PlateGeneratorComponent implements OnInit {

    @ViewChild('canvas', { static: true }) 
    canvas: ElementRef<HTMLCanvasElement>;
    private ctx: CanvasRenderingContext2D;

    public plateWidth: number;
    public plateheight: number;
    public bluePartWidth: number;

    public allCountry: ICountry[];
    public allRegion: IRegion[];

    public selectedCountries: ICountry[];
    public selectedRegions: IRegion[];

    public saveFolder: string;

    public plateCountry: string;
    public plateRegion: string;
    public plateZone1: string;
    public plateZone2: string;
    public plateZone3: string;
    

    public numberGeneratedPlate: number;

    
    constructor(
        private electronService: ElectronService,
    ) { 
        this.initializeValues();
    }

    private initializeValues(): void {
        this.plateWidth = 520;
        this.plateheight = 110;
        this.bluePartWidth = 60;


        this.allCountry = ALL_COUNTRY;
        this.allRegion = ALL_REGION;

        this.selectedCountries = ALL_COUNTRY;
        this.selectedRegions = ALL_REGION;

        this.numberGeneratedPlate = 1;

        this.reloadDemoData();


    }

    public reloadDemoData(): void {
        this.plateZone1 = this.generateRandomAlphaNumeric(2, false, true);
        this.plateZone2 = this.generateRandomAlphaNumeric(3, true, false);
        this.plateZone3 = this.generateRandomAlphaNumeric(2, false, true);

        this.saveFolder = '';
        
        this.plateRegion = this.generateRandomValuesFromArray(this.selectedRegions);
        this.plateCountry = this.generateRandomValuesFromArray(this.selectedCountries);

        console.log (this.plateCountry + '|||' + this.plateZone1 + '-' + this.plateZone2 + '-' + this.plateZone3 + '|||' +this.plateRegion )
    }

    ngOnInit(): void {
        this.ctx = this.canvas.nativeElement.getContext('2d');
        this.ctx.canvas.width = this.plateWidth;
        this.ctx.canvas.height = this.plateheight;
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(0, 0, 5, 5);
        this.drawBlueParts();

    }

    public updatePlateWidth(): void {
        this.ctx.canvas.width = this.plateWidth;
    }

    public updatePlateHeight(): void {
        this.ctx.canvas.height = this.plateheight;
    }

    private generateRandomAlphaNumeric(len: number, onlyNumbers: boolean, onlyChar: boolean): string {
        var result = '';
        var characters = '';
        if (onlyNumbers) {
            characters += '0123456789';
        }
        if (onlyChar) {
            characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        var charactersLength = characters.length;
        for ( var i = 0; i < len; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    private generateRandomValuesFromArray(arr: any[]): any {
        return arr[Math.floor(Math.random() * arr.length)].code;
    }

    private redrawCompletePlate(): void {
        this.cleanBackgroundPlate();
        
    }

    public redrawCompleteBlueParts(): void {
        this.cleanBackgroundPlate();
        this.drawBlueParts()
    }

    private cleanBackgroundPlate(): void {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    }

    private drawBlueParts(): void {
        this.ctx.fillStyle = '#003399';
        this.ctx.fillRect(0, 0, this.bluePartWidth, this.ctx.canvas.height);
        this.ctx.fillRect(this.ctx.canvas.width - this.bluePartWidth , 0, this.bluePartWidth, this.ctx.canvas.height);
    }

    public updateFiltredDataCountry(): void{

    }

    public updateFiltredDataRegion(): void{
        
    }

    public selectFolder(): void {
        const options: OpenDialogOptions = {
            title: 'Ouvrir un dossier',
            properties: ['openDirectory'],
        };
        let saveDirectory = this.electronService.remote.dialog.showOpenDialogSync(options);
        if(saveDirectory)
        {
            this.saveFolder = saveDirectory[0];
        }
    }



}
