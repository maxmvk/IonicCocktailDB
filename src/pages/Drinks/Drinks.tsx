import React from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonToolbar,
  IonIcon, 
  IonLabel, 
  IonButton, 
  IonList, 
  IonItem, 
  IonListHeader, 
  IonImg, 
  IonThumbnail, 
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  useIonViewWillEnter,
} from '@ionic/react';
import { funnelSharp } from 'ionicons/icons';
import styles from './Drinks.module.css';
import { FilterType } from '../../types/types';
import { NavLink } from 'react-router-dom';

type PropsType = {
  selectedFilters: Array<FilterType>,
  displayedItems: Array<FilterType>,
  currentPage: number
  setDisplayedItems: (filter: FilterType) => void
  setCurrentPage: (currentPage: number) => void
}

const Drinks: React.FC<PropsType> = ({selectedFilters, displayedItems, currentPage, setDisplayedItems, setCurrentPage}) => {

  async function displayItems() {
    if(selectedFilters.length>0&&currentPage<selectedFilters.length) {
      setDisplayedItems(selectedFilters[currentPage]);
        setCurrentPage(currentPage+1)
    }
  }

  useIonViewWillEnter(async () => {
    await displayItems();
  });

  async function loadData($event: CustomEvent<void>) {
    await displayItems();

    ($event.target as HTMLIonInfiniteScrollElement).complete();
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className={styles.toolbar}>
          <IonLabel className={styles.title}>Drinks</IonLabel>
          <IonButton fill="clear" color="dark" slot="end">
            <NavLink to="/filters" className={styles.filterBtn}>
              <IonIcon slot="icon-only" icon={funnelSharp}></IonIcon>
            </NavLink>
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList lines="none">
          {
            displayedItems
            ?displayedItems.map((item: any, i: number) => 
              <IonList lines="none">
                <IonListHeader className={styles.listHeader}>{item.strCategory}</IonListHeader>
                {
                  item.drinks.map((d:any) =>
                    <IonItem>
                      <IonThumbnail slot="start" className={styles.drinkImg}>
                        <IonImg src={d.strDrinkThumb}/>
                      </IonThumbnail>
                      <IonLabel color="medium"><p>{d.strDrink}</p></IonLabel>
                    </IonItem>
                  )
                }
                </IonList>
              )
            :null
          }
          <IonInfiniteScroll threshold="100px" onIonInfinite={(e: CustomEvent<void>) => loadData(e)}>
            <IonInfiniteScrollContent
              loadingText="Loading more drinks...">
            </IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Drinks