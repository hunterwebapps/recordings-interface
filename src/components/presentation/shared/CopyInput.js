import React from 'react'
import { string } from 'prop-types'
import CopyToClipboard from 'react-copy-to-clipboard'

class CopyInput extends React.PureComponent {
    state = {
        copied: false
    }

    static displayName = 'Copy Input'

    static propTypes = {
        text: string
    }

    setCopied = () => this.setState({ copied: true })

    render () {
        const {
            text
        } = this.props

        const {
            copied
        } = this.state
        return (
            <div className="input-group">
                <div className="input-group-prepend">
                    <CopyToClipboard text={text} onCopy={this.setCopied}>
                        <button className="btn btn-outline-secondary btn-sm" type="button">
                            {copied ?
                                <span><i className="fas fa-check"></i>{' Copied'}</span>
                                :
                                <span><i className="fas fa-copy"></i>{' Copy'}</span>
                            }
                        </button>
                    </CopyToClipboard>
                </div>
                <input
                    type="text"
                    className="form-control form-control-sm"
                    value={text}
                    readOnly
                />
            </div>
        )
    }
}

export default CopyInput
