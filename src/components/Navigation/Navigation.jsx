import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link} from 'react-router-dom';
import { toggleMenu } from '../../redux/menu/menu-actions';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import {ImgSrc} from '../../utils/utils'

const Navigation = ({location, dispatch, hidden, currentUser}) => {
    if (location.pathname === '/' && currentUser) {
        return (
            <>
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <div
                        className="pa2 tc">
                            <img 
                            style={{objectFit: 'cover'}}
                            onClick={() => dispatch(toggleMenu())}
                            src={ImgSrc(currentUser)}
                            className="br-100 ba h3 w3 dib pointer" alt="avatar" />
                        </div>
                </nav>
                <DropdownMenu hidden={hidden} />
            </>
        );
    } else {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Link to='/signin' style={{outline: 'none'}} className='f3 link dim black pa3 pointer'>Sign In</Link>
                <Link to='/register' style={{outline: 'none'}} className='f3 link dim black pa3 pointer'>Register</Link>
            </nav>
        )
    }
}


const mapStateToProps = ({menu: {hidden}, user: {currentUser}}) => ({hidden, currentUser})

export default withRouter(connect(mapStateToProps)(Navigation));