import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Menu from '../../UI/Menu/Menu'

const toolbar = ( props ) => (
    <header className={classes.Toolbar}>
        {/* <div onClick={props.Clicked}>Menu</div> */}
        <Menu clicked={props.clicked} >
        </Menu>
        <div className={classes.Logo}>
            <Logo/>     
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
        
    </header>
)

export default toolbar;