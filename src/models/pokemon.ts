export type Pokemon = {
    id: string;   
    name: string;
    imggif:string;
    imglarge:string;
    imgnormal:string;
    total: string;
    hp: string;
    attack: string;
    defense: string;
    sp_atk: string;
    sp_def: string;
    speed: string;
    weight: string;
    height: string;
    type: Array<any>;

}
/*dos tipos de export named export(con destructuración con el nombre que definido) , 
default export(importa directo con cualquier nombre) */