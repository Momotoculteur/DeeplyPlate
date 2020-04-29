import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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



    public plateCountry;
    public plateRegion;
    public plateZone1: string;
    public plateZone2: string;
    public plateZone3: string;

    
    constructor() { 
        this.initializeValues();
    }

    private initializeValues(): void {
        this.plateWidth = 520;
        this.plateheight = 110;
        this.bluePartWidth = 60;

        this.plateZone1 = this.generateRandomAlphaNumeric(2, false, true);
        this.plateZone2 = this.generateRandomAlphaNumeric(3, true, false);
        this.plateZone3 = this.generateRandomAlphaNumeric(2, false, true);

    }

    private reloadDemoData(): void {
        this.plateZone1 = this.generateRandomAlphaNumeric(2, false, true);
        this.plateZone2 = this.generateRandomAlphaNumeric(3, true, false);
        this.plateZone3 = this.generateRandomAlphaNumeric(2, false, true);
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

    private redrawCompletePlate(): void {
        this.cleanBackgroundPlate();
        
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



}
