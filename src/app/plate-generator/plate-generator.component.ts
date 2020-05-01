import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ALL_COUNTRY } from '../shared/constant/CCountry';
import { ALL_REGION } from '../shared/constant/CRegion';
import { ICountry } from '../shared/interface/ICountry';
import { IRegion } from '../shared/interface/IRegion';
import { ElectronService } from 'ngx-electron';
import { OpenDialogOptions } from 'electron';
import { timeStamp } from 'console';
import { IMessageImage } from 'backend/shared/interface/IMessageImage';

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

    public regionX: string;
    public regionY: string;
    public regionFontSize: string;

    public countryX: string;
    public countryY: string;
    public countryFontSize: string;

    public plateCountry: string;
    public plateRegion: string;
    public plateZone1: string;
    public plateZone2: string;
    public plateZone3: string;
    
    public plateNumbersX: number;
    public plateNumbersY: number;

    public numberGeneratedPlate: number;

    
    constructor(
        private electronService: ElectronService,
    ) { 
        this.initializeValues();
    }

    private initializeValues(): void {
        this.plateWidth = 520;
        this.plateheight = 110;
        this.bluePartWidth = 50;




        this.allCountry = ALL_COUNTRY;
        this.allRegion = ALL_REGION;

        this.selectedCountries = ALL_COUNTRY;
        this.selectedRegions = ALL_REGION;

        this.numberGeneratedPlate = 1;
        this.saveFolder = '';

        this.reloadData();

    }

    public reloadData(): void {
        this.plateZone1 = this.generateRandomAlphaNumeric(2, false, true);
        this.plateZone2 = this.generateRandomAlphaNumeric(3, true, false);
        this.plateZone3 = this.generateRandomAlphaNumeric(2, false, true);

    
        this.plateRegion = this.generateRandomValuesFromArray(this.selectedRegions);

        this.plateCountry = this.generateRandomValuesFromArray(this.selectedCountries);

        console.log (this.plateCountry + '|||' + this.plateZone1 + '-' + this.plateZone2 + '-' + this.plateZone3 + '|||' +this.plateRegion )


    }

    public reloadNewCompletePlate(): void {
        this.reloadData();
        this.redrawCompletePlate();

    }

    ngOnInit(): void {
        this.ctx = this.canvas.nativeElement.getContext('2d');
        this.ctx.canvas.width = this.plateWidth;
        this.ctx.canvas.height = this.plateheight;
        this.redrawCompletePlate();

    }

    public launchGenerator(): void {
        let data: IMessageImage = {
            directory: this.saveFolder,
            listCountry: this.selectedCountries,
            listRegion: this.selectedRegions,
            numberGeneretedPlate: this.numberGeneratedPlate
        };
        console.log('GOOOOOOOOO')
        this.electronService.ipcRenderer.send('launchGenerator', data);
    }

    public updatePlateWidth(): void {
        this.ctx.canvas.width = this.plateWidth;
        this.redrawCompletePlate();
    }

    public updatePlateHeight(): void {
        this.ctx.canvas.height = this.plateheight;
        this.redrawCompletePlate();
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

    public redrawCompletePlate(): void {
        this.cleanBackgroundPlate();
        this.drawBlueParts()

        this.drawTextPlateNumbers();
        this.drawTextCountry();
        this.drawTextRegion();
    }



    private cleanBackgroundPlate(): void {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    private drawTextCountry(): void {
        this.ctx.fillStyle = "white";
        this.ctx.font = "40px Euro Plate";
        this.ctx.fillText(this.plateCountry, 16,100);

    }
    private drawTextRegion(): void {
        if(this.plateRegion.length == 2) {
            this.ctx.fillStyle = "white";
            this.ctx.font = "40px Euro Plate";
            this.ctx.fillText(this.plateRegion, 475,95);
        } else {
            let start1Region = this.plateRegion.substr(0,1);
            let start2Region = this.plateRegion.substr(1,1);
            let endRegion = this.plateRegion.substr(2,3);

            this.ctx.fillStyle = "white";
            this.ctx.font = "45px Euro Plate";
            this.ctx.fillText(endRegion, 490,100);


            this.ctx.fillStyle = "white";
            this.ctx.font = "20px Euro Plate";
            this.ctx.fillText(start1Region, 475,82);

            this.ctx.fillStyle = "white";
            this.ctx.font = "20px Euro Plate";
            this.ctx.fillText(start1Region, 475,100);
        }


    }
    private drawTextPlateNumbers(): void {
        this.ctx.fillStyle = "black";
        this.ctx.font = "90px Euro Plate";
        let fullPlateNumbers = this.plateZone1 + '-' + this.plateZone2 + '-' + this.plateZone3;
        this.ctx.fillText(fullPlateNumbers, 50,90);
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
