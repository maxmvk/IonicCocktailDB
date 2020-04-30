import React from 'react';
import { connect } from 'react-redux';
import Drinks from './Drinks';
import { setDisplayedItems, setCurrentPage} from '../../redux/filters-reducer';
import { FilterType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';

type PropsType = {
    selectedFilters: Array<FilterType>
    displayedItems: Array<FilterType>
    currentPage: number
    setDisplayedItems: (filter: FilterType) => void
    setCurrentPage: (currentPage: number) => void
}

class DrinksContainer extends React.Component<PropsType> {

    render() {
        return (
            <Drinks selectedFilters={this.props.selectedFilters}
                    displayedItems={this.props.displayedItems}
                    currentPage={this.props.currentPage}
                    setDisplayedItems={this.props.setDisplayedItems}
                    setCurrentPage={this.props.setCurrentPage}/>
        )
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        selectedFilters: state.filtersState.selectedFilters,
        displayedItems: state.filtersState.displayedItems,
        currentPage: state.filtersState.currentPage
    }
}

export default connect(mapStateToProps, { setDisplayedItems, setCurrentPage })(DrinksContainer);