import { EntriesState } from './';
import { Entry } from '../../interfaces'



type EntriesActionType = 
| { type: '[Entry] Add-Entry', payload: Entry }
| { type: '[Entry] ENTRY-UPDATED', payload: Entry}
| { type: '[Entry] Refresh-Data', payload: Entry[]}

export const entriesReducer = ( state: EntriesState, action: EntriesActionType): EntriesState =>{

    // switch (action.type) {
    //     case 'UI - Open Sidebar':
    //         return  {
    //             ...state,

    //         }
    switch (action.type) {
        case '[Entry] Add-Entry':
            return  {
                ...state,
                entries: [...state.entries, action.payload]
            }
        case '[Entry] ENTRY-UPDATED':
            return{
                ...state,
                entries: state.entries.map(entry => {
                    if(entry._id === action.payload._id){
                        entry.status = action.payload.status;
                        // entry.createdAt = Date.now()
                        entry.description = action.payload.description;
                    }
                    return entry
                })
            }
        case '[Entry] Refresh-Data':
            return {
                ...state,
                entries: [...action.payload]
            }
        default:
            return state;
    }
}