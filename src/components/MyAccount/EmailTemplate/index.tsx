import React, {Component} from "react";
import BraftEditor from "braft-editor";
import $ from "jquery";
import "braft-editor/dist/index.css";

class EmailTemplate extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      editorState: "",
      outputHTML: "",
    };
  }

  componentDidMount() {
    this.setState({
      editorState: BraftEditor.createEditorState(`<p><%= customerName %> has invited you to write a review for <%= companyName %> on the Hindsyght platform. Please click on the link below to start the review process. It will just take a couple of minutes!</p>
      <p>Hindsyght is the go-to platform for connecting IT services and solutions with businesses across the nation.</p>
      <table align="center" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td height="40px" width="150px" style="height: 40px; width: 150px; text-align: center; border-radius: 3px; background-color: #2a84b3;">
            <a style="color: white; text-decoration: none; display: inline-block; width: 100%; height: 100%; line-height: 40px;" href="<%= link %>?token=<%= token %>">Verify Email</a>
          </td>
        </tr>
      </table>`),
    });
  }

  handleChange = (editorState: any) => {
    console.log(editorState);
    console.log(
      $("<textarea />")
        .html(editorState.toHTML())
        .text()
    );

    this.setState({
      editorState: editorState,
      outputHTML: editorState.toHTML(),
    });
  };

  render() {
    const {editorState} = this.state;

    return (
      <React.Fragment>
        <div className="card_box">
          <BraftEditor language="en" value={editorState} onChange={this.handleChange} />
        </div>
      </React.Fragment>
    );
  }
}

export default EmailTemplate;
