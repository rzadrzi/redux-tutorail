/**
 * Action Creators      =>  Action  =>  dispatch        =>  Reducers   => State
 * Person               =>  Form    =>  Form Reciever   =>  Departmens => Compiled Department data  
 * Insurance has 3 departments "Policy", "Claim", "Account"
 * 
 */


const Redux = require('redux');

// Action Creators
const createPolicy = (name,amount)=>{
    obj={
        type:'CREATE_POLICY',
        payload:{
            name,amount
        }
    };
    return obj
}

const deletePolicy = name =>{
    obj={
        type:'DELETE_PLICY',
        payload:{name}
    };
    return obj
}

const createClaim = (name, amountOfMoneyToCollect)=>{
    obj={
        type:'CREATE_CLAIM',
        payload:{
            name,amountOfMoneyToCollect
        }
    };
    return obj
}

// Reducers = Departments

const clainHistory = (oldListOfClaims=[],action)=>{
    if(action.type==='CREATE_CLAIM'){
       return [...oldListOfClaims,action.payload] 
    }
    return oldListOfClaims;
}

const accounting = (bagOfMoney=100,action)=>{
    if(action.type==='CREATE_CLAIM'){
        return bagOfMoney - action.payload.amountOfMoneyToCollect 
     }else if(action.type === 'CREATE_POLICY'){
        return bagOfMoney + action.payload.amount
     }
     return bagOfMoney
}

const policy = (listOfPolicy=[], action)=>{
    if(action.type==='CREATE_POLICY'){
        return [...listOfPolicy, action.payload.name]
    }else if(action.type==='DELETE_PLICY'){
        return listOfPolicy.filter(name => name !== action.payload.name)
    }
    return listOfPolicy;
}

const Departmens = Redux.combineReducers({
    clainHistory,
    accounting,
    policy
})

const store=Redux.createStore(Departmens)

store.dispatch(createPolicy("reza",5665))
store.dispatch(createPolicy("Hamed", 453))
store.dispatch(createClaim("Hamed", 453))
store.dispatch(deletePolicy("reza"))

console.log(store.getState());
// console.table(store.getState())
