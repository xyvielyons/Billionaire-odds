// store/slices/counterSlice.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
 
//create the type of the initial CounterState Value that is going to be passed in
interface CustomGame {
    id:string;
    homeTeam:string;
    awayTeam:string;
    gameOdd:number;
}
interface CustomGamesState {
    games:CustomGame[]
}


//our initial counter state is o
const initialState: CustomGamesState = {
    games:[]
};
 
const CustomGameSlice = createSlice({
    //name of the slice
    name: "CustomGameSlice",
    //the initial state
    initialState,
    //the reducer functions
    reducers: {
        addGame:(state,action:PayloadAction<CustomGame>)=>{
            state.games.push(action.payload);
        },
        
        clearGames:(state)=>{
            state.games = [];
        },

        removeGame:(state,action:PayloadAction<string>)=>{
            state.games = state.games.filter(game => game.id !== action.payload)
        },

        updateOdd:(state, action:PayloadAction<{id:string,newOdd:number}>)=>{
            const game = state.games.find(g => g.id === action.payload.id);
            if(game){
                game.gameOdd = action.payload.newOdd;
            }
        }
    },
});

//export the reducers from counterSlice.actions
export const { addGame,removeGame,clearGames,updateOdd } = CustomGameSlice.actions;
//export the counterSlice.reducer
export default CustomGameSlice.reducer;