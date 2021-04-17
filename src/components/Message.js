import '../stylesheets/Message.css';

function Message(props){

    const {active, setActive, msg, success} = props;

    const style = {
        backgroundColor: (success?"green":"red")
    }

    if(active)
        return (<div id="msg" style={style}>
            {msg}
            <i className="material-icons" id="cancel"
            onClick={()=>setActive(false)}>cancel</i>
        </div>);
    else
        return null;
}

export default Message;

