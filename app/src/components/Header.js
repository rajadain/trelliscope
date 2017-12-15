import { h, Component } from 'preact';
import { Layout, Navigation } from 'preact-mdl';
import { connect } from 'preact-redux';
import Progress from 'preact-progress';
import { Link } from 'react-router-dom';

import {
    tickProgressBar,
} from '../redux/actions';
import { bindActions } from '../redux/utils';

let timer;
const onProgressStart = (ctx) => { ctx.base.style.opacity = 100 };
const onProgressComplete = (ctx) => {
    setTimeout(() => {
        ctx.base.style.opacity = 0;
    }, 800)};

class Header extends Component {
    componentWillReceiveProps({ header: { loading }, tickProgressBar }) {
        if (loading) {
            timer = setInterval(() => {
                tickProgressBar();
            }, 800);
        } else {
            clearInterval(timer);
        }
    }

    render({ header: { progress }}) {
        return (
            <Layout.Header>
                <Layout.HeaderRow>
                    <Layout.Title>Trelliscope</Layout.Title>
                    <Layout.Spacer />
                    <Navigation>
                        <Link to="/login">Login</Link>
                    </Navigation>
                </Layout.HeaderRow>
                <Progress
                    className="progress"
                    color="#4f83cc" value={progress}
                    onStart={onProgressStart}
                    onChange={() => {}}
                    onComplete={onProgressComplete} />
            </Layout.Header>
        );
    }
}

const mapStateToProps = (state) => ({ header: state.header });
const mapDispatchToProps = bindActions({
    tickProgressBar,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
