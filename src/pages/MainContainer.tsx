import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setFilters, setDisplayedItems, applySelectedFilters} from '../redux/filters-reducer';
import { FilterType } from '../types/types';
import { AppStateType } from '../redux/redux-store';
import Main from './Main';

type PropsType = {
    displayedItems: Array<FilterType>
    setFilters: (filter: FilterType) => void
    setDisplayedItems: (filter: FilterType) => void
    applySelectedFilters: (filter: FilterType) => void
}

class MainContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.getFilters()
    }

    changeName (str: string) {
        return str.replace(' ', '_');
    }
    
    getDrinks(filter:FilterType) {
        return axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${this.changeName(filter.strCategory)}`).then(response => {
            return response.data.drinks
        })
    }

    getFilters() {
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`).then(response => {
            response.data.drinks.forEach((filter:FilterType) => {
                let id = Math.random()
                this.getDrinks(filter).then((drinks) => {
                    this.props.setFilters({...filter, id: id, selected: true, drinks: drinks})
                    this.props.applySelectedFilters({...filter, id: id, selected: true, drinks: drinks})
                    if(this.props.displayedItems.length===0) {
                        this.props.setDisplayedItems({...filter, id: id, selected: true, drinks: drinks})
                    }
                })
            })
        })
    }

    render() {
        return (
            <Main />
        )
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        displayedItems: state.filtersState.displayedItems,
    }
}

export default connect(mapStateToProps, { setFilters, setDisplayedItems, applySelectedFilters })(MainContainer);