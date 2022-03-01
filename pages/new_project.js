export default function NewProjectPage(){
    const dev = process.env.NODE_ENV !== 'production';

    var page;

    if (dev) {
        page = (
            <div>
                <h1>New Project Page</h1>
            </div>
        );
    } else {
        page = (
            <div>
                <h1>Can't modify projects outside dev environment.</h1>
                <p>I realise this is a less than ideal way to do this, but oh well...</p>
            </div>
        );
    }


    return page;
}