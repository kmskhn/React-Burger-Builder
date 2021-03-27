import React from 'react';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';

const INGREDIENT_PRICE = {
            meat:1.3,
            cheese: 0.5,
            bacon: 0.4,
            salad: 0.3
}

class BurgerBuilder extends React.Component{

    state = {
        ingredients: {
            meat:0,
            cheese: 0,
            bacon: 0,
            salad: 0

        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false
        
    }
    updatePurchaseState = (updatedprice) => {
        if(this.state.totalPrice < updatedprice) {  this.setState({
            purchaseable: true  
        })} else {
            this.setState({
                purchaseable: false  
            })
        }      
    }    
    
    purchasehandler = () =>{
        this.setState({
            purchasing: true
        })
    }

    addIngredienthandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;

        const updatedIngredients = {
            ...this.state.ingredients 
        }

        updatedIngredients[type] = updatedCount;

        let updatedPrice = this.state.totalPrice + INGREDIENT_PRICE[type];

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        })

        this.updatePurchaseState(updatedPrice);
    }

    removeIngredienthandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateIngredients = {
            ...this.state.ingredients
        }

        let updatedPrice = this.state.totalPrice;

        if( updateIngredients[type] > 0) {
            updateIngredients[type] = oldCount - 1;  
            updatedPrice = this.state.totalPrice - INGREDIENT_PRICE[type];
        }

        this.setState({
            ingredients: updateIngredients,
            totalPrice: updatedPrice
        })

        this.updatePurchaseState(updatedPrice);
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        // alert('YOU CONTINUE');
        this.setState({
            loading: true
        })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                address: {
                    street: 'fdjhdhdhkvkjvfyufdfvyluf',
                    country: "india",
                    zipcode: "79874756"
                },
                name: "Kalim Khan",
                email: "test@test.com"
            },
            deliveryMethod: 'fastest'
           
        }

        axios.post('/orders.json', order)
        .then( resposne => {
            this.setState({
                loading: false,
                purchasing: false
            })
            console.log("ffffffffffffff");
            
        })
        .catch( error => {
            this.setState({
                loading: false,
                purchasing: false
            } )
            console.log("catch block");
            
    })
    }

    render(){


    let orderSummary = 
        (
            <OrderSummary 
                    ingredients={this.state.ingredients}
                    purchaseContinue={this.purchaseContinueHandler}
                    purchaseCancelled={this.purchaseCancelHandler}
                    totalPrice={this.state.totalPrice}
                    />
        )

        if(this.state.loading){
            orderSummary = <Spinner/>
        }
    

        const disabledInfo = {
            ...this.state.ingredients
        };
        
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }
        return (
            <>

                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}  
                >
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                ingredientAdded={this.addIngredienthandler}
                ingredientRemoved={this.removeIngredienthandler}
                price={this.state.totalPrice}
                disabledInfo={disabledInfo}
                purchaseable={this.state.purchaseable}
                ordered={this.purchasehandler}
                />
            </>
        );
    }
} 

export default BurgerBuilder;