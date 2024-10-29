const CallApiBtn = () => {

    const callApi = () => {

        fetch("http://localhost:8000/songs/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => {
            console.log("Response status: ", res.status);

            return res.json();
        }).then(data => {
            console.log("Message: ", data);
        })
    }

    return (
        <div onClick={() => callApi()}
            className='home_getStartedButton_container'>
            <div className='home_getStartedButton'>
                <p>
                    Gọi APi và xem ở Console log
                </p>
            </div>
        </div>
    )
}

export default CallApiBtn;