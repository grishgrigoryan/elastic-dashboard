import * as React            from 'react';
import {EuiTitle}            from "@elastic/eui";
import {EuiForm}             from '@elastic/eui';
import {EuiModal}            from '@elastic/eui';
import {EuiOverlayMask}      from '@elastic/eui';
import {EuiModalHeader}      from '@elastic/eui';
import {EuiModalHeaderTitle} from '@elastic/eui';
import {EuiModalBody}        from '@elastic/eui';
import {EuiModalFooter}      from '@elastic/eui';
import {EuiButtonEmpty}      from '@elastic/eui';
import {EuiButton}           from '@elastic/eui';

export class ConfirmationModal extends React.Component<ConfirmationModalProps, ConfirmationModalState> {

  render() {
    return (
      <EuiOverlayMask>
        <EuiModal
          onClose={this.props.onClose}
        >
          <EuiModalHeader>
            <EuiModalHeaderTitle>
              {this.props.title}
            </EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            {this.props.body}
            You can't recover deleted data.
          </EuiModalBody>
          <EuiModalFooter>
            <EuiButtonEmpty onClick={() => {
              this.props.onCancel ? this.props.onCancel() : this.props.onClose()
            }}>Cancel
            </EuiButtonEmpty>
            <EuiButton color="danger" fill onClick={this.props.onConfirm}>{this.props.ctaText}</EuiButton>
          </EuiModalFooter>
        </EuiModal>
      </EuiOverlayMask>
    )
  }
}

export interface ConfirmationModalProps {
  title: string,
  body: string,
  ctaText: string,
  onClose: () => void
  onConfirm: () => void
  onCancel?: () => void
}

export interface ConfirmationModalState {
}
    