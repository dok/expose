var Image = React.createClass({
    mixins: [expose],
    componentDidMount: function() {
        this.expose();
    },
    render: function() {
        var rand = Math.floor(Math.random() * (800));
        return (
            <li>
                <img data-src={`http://lorempixel.com/${rand}/200/city`} ref="image"/>
            </li>
        );
    }
});

React.render(
    <ul>
        <Image/>
        <Image/>
        <Image/>
        <Image/>
        <Image/>
        <Image/>
        <Image/>
        <Image/>
        <Image/>
        <Image/>
        <Image/>
        <Image/>
    </ul>,
    document.getElementById('images')
);
