import { useMap } from './hooks/map.service';

function Map() {
    // mapWidth: Number;
    // mapHeight: Number;

    const {participants, id} = useMap();
    return (
        <div>
            { id }
            { participants && participants.map(p => <div>{p.name} {p.id} {p.getPosition()}</div>) }
        </div>
    )
}

export default Map;