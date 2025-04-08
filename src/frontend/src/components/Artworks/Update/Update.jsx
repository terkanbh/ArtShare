import { useParams } from 'react-router';
import styles from './Update.module.css';

export default function Settings() {
    const { id } = useParams();
    return (<p> Edit Artwork {id} </p>);
}