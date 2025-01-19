import React from 'react';
import { Pokemon } from '../models/pokemon';

export async function getPokemons(): Promise<Pokemon[]>{
    //Llamado de api rest
 const response = await fetch("https://unpkg.com/pokemons@1.1.0/pokemons.json");
 const data = await response.json();
 const pokemons = data.results.map((pokemon:any)=>({
    name: pokemon.name,
    id: pokemon.national_number,
    imggif: CorrectName(pokemon.sprites['animated']) ,
    imglarge: CorrectName(pokemon.sprites['large']),
    imgnormal: CorrectName (pokemon.sprites['normal']),
    total: pokemon.total,
    hp: pokemon.hp,
    attack: pokemon.attack,
    defense: pokemon.defense,
    sp_atk: pokemon.sp_atk,
    sp_def: pokemon.sp_def,
    speed: pokemon.speed,
    weight: pokemon.weight,
    height: pokemon.height,
    type: pokemon.type[0]
 }));

 const onlyPokemons = pokemons.filter(
    (pokemon:any, index: number) => 
    pokemons.findIndex((other:any) => other.id === pokemon.id) === index
 );


 return onlyPokemons;
}
//Hay nombres que no se mostraba la imagen por errores de simbolos
export function CorrectName(name:string): string {
    if (name.includes("farfetch'd")) {
        return name.replace("farfetch'd", "farfetchd");

    }else if(name.includes("mr.-mime")){
        return name.replace("mr.-mime", "mr-mime");

    }else if (name.includes("nidoran♀")) {
        return name.replace("nidoran♀", "nidoran-f");

    }else if (name.includes("nidoran♂")) {
        return name.replace("nidoran♂", "nidoran-m");
    }else{
        return name;
    }
    
}