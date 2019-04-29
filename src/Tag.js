import React from 'react'
import Chip from '@material-ui/core/Chip'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  tag_no_value: {
    paddingRight: 6,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  tag_with_value: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  value: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  name_label: {
    paddingRight: 6,
  },
  value_label: {
    paddingLeft: 6,
    //overflowX: 'scroll',
  },
  tag_w_val_chip: {
    color: 'white',
  },
  tag_w_val_div: {
    margin: 3,
    whiteSpace: 'nowrap',
    //textOverflow: 'ellipsis', 
    //overflow: 'hidden',
    maxWidth: '100%',
    display: 'inline-flex',
  },
  tag_w_val_2nd_chip: {
    //whiteSpace: 'nowrap', 
    //textOverflow: 'ellipsis',
    overflow: 'hidden',
    border: `1px solid`
  },
  tag_name_with_hidden_val: {
    marginRight: 0,
  },
}

function split_string_pair(string) {
  const split = string.indexOf(':')
  if (split < 0) return { tag_name: string, tag_value: '' }
  const tag_name = string.substring(0, split)
  const tag_value = string.substring(split + 1)
  return { tag_name, tag_value }
}

const TagName = (props) => {
  return (
    <Chip
      label={props.tag_name}
      classes={props.classes} // TODO: root: props.style ?
      clickable
      onClick={props.onClick}
      variant={props.variant}
      style={{
        ...props.style,
        color: props.variant === 'outlined' ?
          props.color : 'white',
        border: `1px solid ${props.color}`,
        textShadow: props.variant === 'outlined' ?
          '0px 0px 20px' : 'none',
        backgroundColor: props.variant === 'outlined' ?
          'white' : props.color,
        margin: 3,
      }}
    />
  )
}

const TagValueHalf = props => {
  return (
    <Chip
      label={props.label}
      variant='outlined'
      classes={props.classes}
      clickable
      onClick={props.on_value_click}
      style={{
        ...props.style,
        //...styles.tag_w_val_2nd_chip,
        //borderColor: props.color,
        //color: props.color,
        display: props.hide_value ? 'none' : 'inline-flex',
      }}
    />
  )
}

const NameValuePair = (props) => {
  return (
    <div style={{
      ...props.style,
      ...styles.tag_w_val_div,
      marginRight: props.hide_value ? 0 : 3,
    }}>
      <Chip
        label={props.tag_name}
        classes={props.name_classes}
        clickable
        onClick={props.onClick}
        style={{
          ...props.style,
          ...styles.tag_w_val_chip,
          backgroundColor: props.color,
        }}
      />
      <TagValueHalf
        label={props.tag_value}
        variant='outlined'
        classes={props.value_classes}
        clickable
        onClick={props.on_value_click}
        hide_value={props.hide_value}
        style={{
          ...props.style,
          ...styles.tag_w_val_2nd_chip,
          borderColor: props.color,
          color: props.color,
        }}
      />
    </div>
  )
}

const Tag = (props) => {
  let tag_name, tag_value
  if (props.nameValueString) {
    ({ tag_name, tag_value } =
      split_string_pair(props.nameValueString))
    if (tag_value === 'null') tag_value = null
  } else {
    tag_name = props.name
    tag_value = props.value
  }
  const renderTag = (name, value = null) => (
    value ?
      <NameValuePair
        tag_name={name}
        tag_value={value}
        color={props.color}
        name_classes={{
          label: props.classes.name_label,
          root: props.classes.tag_with_value,
        }}
        value_classes={{
          label: props.classes.value_label,
          root: props.classes.value,
        }}
        onClick={props.onClick}
        //name_style={props.style}
        value_style={props.style}
        hide_value={props.hide_value}
      /> :
      <TagName
        tag_name={name}
        color={props.color}
        classes={{
          label: props.classes.tag_no_value,
          root: props.classes.tag_no_value,
        }}
        variant={props.variant}
        onClick={props.onClick}
        style={props.style}
      />
  )
  return renderTag(tag_name, tag_value)
}

export default withStyles(styles)(Tag)
