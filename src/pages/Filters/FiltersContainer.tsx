import React from 'react';
import { connect } from 'react-redux';
import { setSelected, setDisplayedItems, applySelectedFilters, refreshFilters } from '../../redux/filters-reducer';
import { FilterType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';
import Filters from './Filters';

type PropsType = {
    filters: Array<FilterType>
    displayedItems: Array<FilterType>
    setSelected: (id: number) => void
    setDisplayedItems: (filter: FilterType) => void
    applySelectedFilters: (filter: FilterType) => void
    refreshFilters: () => void
}

class FiltersContainer extends React.Component<PropsType> {

    applyFilters = () => {
        this.props.refreshFilters()
        this.props.filters.forEach(filter => {
            if(filter.selected===true) {
                this.props.applySelectedFilters(filter)
                setTimeout(() => {
                    if(this.props.displayedItems.length===0) {
                        this.props.setDisplayedItems(filter)
                    }
                }, 500);
            }
        })
    }

    render() {
        return (
            <Filters filters={this.props.filters} 
                     setSelected={this.props.setSelected}
                     applyFilters={this.applyFilters}/>
        )
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        filters: state.filtersState.filters,
        displayedItems: state.filtersState.displayedItems
    }
}

export default connect(mapStateToProps, { setSelected, setDisplayedItems, applySelectedFilters, refreshFilters })(FiltersContainer);