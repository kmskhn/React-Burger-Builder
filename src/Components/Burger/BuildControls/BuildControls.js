import React from 'react';
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.css'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price : <b>{props.price.toFixed(2)}</b></p> 
        {controls.map(ctrl => (
            <BuildControl 
            key={ctrl.label}  
            label={ctrl.label}
            added={props.ingredientAdded.bind(this,ctrl.type)}
            removed={props.ingredientRemoved.bind(this,ctrl.type)}
            disabled={props.disabledInfo[ctrl.type]}
             />)
        )}
        <button 
        className={classes.OrderButton}
        disabled={!props.purchaseable}
        onClick={props.ordered}
        
        >ORDER NOW</button>
    </div>
); 



export default buildControls;