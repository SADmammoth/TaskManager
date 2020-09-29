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
        (obj[el.name + shortid.generate()] = { type: el.type, name: el.name })
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
    label = false
  ) => {
    let result = [];

    if (type === "textarea") {
      result.push(
        <textarea id={id} name={name} onChange={callback}>
          description
        </textarea>
      );
    } else {
      result.push(
        <input
          id={id}
          type={type}
          name={name}
          placeholder={description}
          required={required ? "required" : null}
          onChange={callback}
        />
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
      let { type, name, description, required, label } = el;
      return Form.createInput(
        Object.keys(this.state.values)[i],
        type,
        name,
        description,
        this.updateValue,
        required,
        label
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
        <form method={this.props.method} action={this.props.action}>
          {this.createInputs()}
          <button
            type="submit"
            onClick={event => {
              event.preventDefault();
              this.props.onSubmit(this.formatValues());
            }}
          ></button>
        </form>
      </>
    );
  }
}

export default Form;
