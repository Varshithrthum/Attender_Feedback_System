import DatePicker from "react-datepicker";

export function People({ newName, eventName, newLastName, eventLastName, newAge, eventAge, newEmail, eventEmail, handEvent, buttonName }) {
    const name = { eventName, eventLastName, eventAge, eventEmail }
    let focusedElement = document.activeElement.id;


    return (
        <div className="addNewEventsCont">
            <div className="event-cont">
                <div className="event-label-row">
                    <div className="event-label-name">First Name:</div>
                    <div className="event-label-input">
                        <input type='text' placeholder='Enter First name' name="newFirstName" id="newFirstnameId"
                            onInput={e => newName(e.target.value)} value={name.eventName}
                            autoFocus={true}
                        />
                    </div>
                </div>
                <div className="event-label-row">
                    <div className="event-label-name">Last Name:</div>
                    <div className="event-label-input">
                        <input type='text' placeholder='Enter Last name' name="newLastName" id="newLastnameId"
                            onInput={e => newLastName(e.target.value)} value={name.eventLastName}
                            autoFocus={true}
                        />
                    </div>
                </div>
                <div className="event-label-row">
                    <div className="event-label-name">Age:</div>
                    <div className="event-label-input">
                        <input type='text' placeholder='Enter age' name="age" id="ageId"
                            onInput={e => newAge(e.target.value)} value={name.eventAge}
                            autoFocus={true}
                        />
                    </div>
                </div>  <div className="event-label-row">
                    <div className="event-label-name">Email id:</div>
                    <div className="event-label-input">
                        <input type='text' placeholder='Enter email ID' name="newEmailId" id="newEmailId"
                            onInput={e => newEmail(e.target.value)} value={name.eventEmail}
                            autoFocus={true}
                        />
                    </div>
                </div>
            </div>
            <div className="event-cont-button">
                <button type='button' onClick={(e) => handEvent(eventName, eventLastName, eventAge, eventEmail, e)}>
                    {buttonName}
                </button>
            </div>

        </div>
    )
}