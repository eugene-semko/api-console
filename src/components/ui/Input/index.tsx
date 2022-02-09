import React, { AllHTMLAttributes, FC, useEffect, useState } from "react";
import styles from "./index.module.css";
import classNames from "classnames";
import { Control, Controller } from "react-hook-form";
import ReactInputMask from "react-input-mask";

type propsType = {
   className?: string;
   control: Control<any>;
   mask?: string;
   name: string;
   label: string;
   error?: boolean;
   optionalLabel?: string;
} & AllHTMLAttributes<HTMLInputElement>;
export const Input: FC<propsType> = (props) => {
   return (
      <div
         className={classNames({
            [styles.container]: true,
            [styles.error_container]: props.error,
            [`${props.className}`]: props.className,
         })}
      >
         <div className={styles.labels_container}>
            <div className={styles.label}>{props.label}</div>
            <div className={styles.optional_label}>{props.optionalLabel}</div>
         </div>
         <Controller
            control={props.control}
            name={props.name}
            defaultValue={props.defaultValue || undefined}
            render={({ field: { onChange, onBlur, value, ref } }) => (
               <ReactInputMask
                  mask={props.mask || ""}
                  onBlur={(e) => {
                     onBlur();
                     props.onBlur?.(e);
                  }}
                  maskPlaceholder={null}
                  {...props}
                  value={props.value || value || ""}
                  onChange={(e) => {
                     onChange(e);
                     props.onChange && props.onChange(e);
                  }}
                  className={classNames({
                     [styles.input]: true,
                     [styles.error_input]: props.error,
                  })}
                  disabled={!!props.disabled}
               />
            )}
         />
      </div>
   );
};
