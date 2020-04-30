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
} from '@ionic/react';
import styles from './Filters.module.css';
import { arrowBackOutline, checkmarkOutline } from 'ionicons/icons';
import { FilterType } from '../../types/types';
import { NavLink } from 'react-router-dom';

type PropsType = {
  filters: Array<FilterType>
  setSelected: (id: number) => void
  applyFilters: () => void
}

const Filters: React.FC<PropsType> = ({filters, setSelected, applyFilters}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className={styles.toolbar}>
          <IonButton fill="clear" color="dark" slot="start" onClick={() => { applyFilters() }}>
            <NavLink to="/drinks" className={styles.backBtn}>
              <IonIcon slot="icon-only" icon={arrowBackOutline}></IonIcon>
            </NavLink>
          </IonButton>
          <IonLabel className={styles.title}>Filters</IonLabel>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList lines="none">
          { 
            filters
            ?filters.map(f => 
              <IonItem className={styles.filter} onClick={() => { setSelected(f.id) }}>
                <IonLabel color="medium"><p>{f.strCategory}</p></IonLabel>
                {
                  f.selected
                  ?<IonIcon icon={checkmarkOutline}></IonIcon>
                  :null
                }
              </IonItem>
            )
            :null
          }
        </IonList>
      </IonContent>
      <NavLink to="/drinks" className={styles.link}>
        <IonButton color="dark" expand="full" className={styles.applyBtn} onClick={() => { applyFilters() }}>APPLY</IonButton>
      </NavLink>
    </IonPage>
  );
};

export default Filters;
