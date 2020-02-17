import React from "react";
import shortid from "shortid";

class Form extends React.Component {
  state = {
    values: {}
  };

  updateValue = event => {
    let values = Object.assign({}, this.state.values);
    values[event.target.id].value = event.target.value;
    this.setState({ values: values });
  };

  createValues() {
    let obj = {};
    this.props.inputs.forEach(
      el =>
        (obj[el.name + shortid.generate()] = {
          type: el.type,
          name: el.name,
          value: el.attributes ? el.attributes.value : undefined
        })
    );
    this.setState({ values: obj });
  }

  createValue = (id, type, name) => {
    let values = {};
    values[id] = { type: type, name: name };
    this.setState({ values: Object.assign(this.state.values, values) });
  };

  static createInput = (
    id,
    type,
    name,
    description,
    callback,
    required = false,
    label = false,
    attributes = [],
    value = undefined
  ) => {
    let result = [];

    if (type === "textarea") {
      result.push(
        <div class="form-input-group">
          {!label || (
            <label className="form-label" for={id}>
              {label}
            </label>
          )}
          <textarea
            id={id}
            name={name}
            className="form-textarea"
            onChange={callback}
            placeholder={description}
            required={required ? "required" : null}
            {...attributes}
            value={value}
          ></textarea>
        </div>
      );
    } else {
      result.push(
        <div class="form-input-group">
          {!label || (
            <label className="form-label" for={id}>
              {label}
            </label>
          )}
          <input
            id={id}
            type={type}
            name={name}
            className="form-input"
            placeholder={description}
            required={required ? "required" : null}
            onChange={callback}
            {...attributes}
            value={value}
          />
        </div>
      );
    }
    return result;
  };

  componentDidMount() {
    this.createValues();
  }

  createInputs() {
    if (Object.keys(this.state.values).length === 0) {
      return null;
    }
    return this.props.inputs.map((el, i) => {
      let { type, name, description, required, label, attributes } = el;
      return Form.createInput(
        Object.keys(this.state.values)[i],
        type,
        name,
        description,
        this.updateValue,
        required,
        label,
        attributes,
        this.state.values[Object.keys(this.state.values)[i]].value
      );
    });
  }

  formatValues() {
    let values = {};
    Object.values(this.state.values).forEach(
      el => (values[el.name] = el.value)
    );
    console.log(values);
    return values;
  }
  render() {
    return (
      <>
        <form
          method={this.props.method}
          action={this.props.action}
          className={"form " + this.props.className || ""}
          style={Object.assign({}, this.props.style)}
        >
          {this.createInputs()}
          {React.cloneElement(this.props.submitButton, {
            type: "submit",
            action: event => {
              event.preventDefault();
              this.props.onSubmit(this.formatValues());
            }
          })}
        </form>
      </>
    );
  }
}

export default Form;
