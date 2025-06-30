import React from 'react'
import { Dialog, DialogTitle, Breakpoint } from '@mui/material';
import { Spinner } from './spinner';
import Style from './Popup.module.scss';
import { Close } from '@mui/icons-material';
// import { Close } from '@mui/icons-material';


export interface PopupProps {
    isOpen: boolean;
    handleClose: (value: boolean) => void;
    title?: string;
    width?: number;
    maxWidth?: Breakpoint;
    isLoading?: boolean;
    borderRadius?: number;
    isFullScreen?: boolean;
    isShowHeader?: boolean;
    containerClassName?: string;
    children?: React.ReactNode;
}

function CustomPopover({
    isOpen,
    handleClose,
    title = '',
    width = 475,
    maxWidth = 'sm',
    isLoading = false,
    borderRadius = 25,
    isFullScreen = false,
    isShowHeader = true,
    containerClassName,
    children,

}: PopupProps) {

    const closePopup = () => {
        handleClose?.(true);
    };
    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                fullScreen={isFullScreen}
                aria-describedby="alert-dialog-slide-description"
                className={Style.dialog}
                maxWidth={maxWidth}
                PaperProps={{
                    style: {
                        backgroundColor: 'rgb(255 255 255 / 40%)',
                        backdropFilter: 'blur(1px)',
                        width: width,
                        minHeight: 150,
                        borderRadius: borderRadius,
                    },
                }}
            >
                <div className={`${Style.container} ${containerClassName}`}>
                    {isShowHeader && (
                        <DialogTitle>
                            <div className={Style.title}>
                                <div>{title}</div>
                                {isLoading && (
                                    <div className={`${Style.closeIcon} mt-3`}>
                                        <Spinner isLoading={isLoading} />
                                    </div>
                                )}
                                {!isLoading && (
                                    <div className={`${Style.closeIcon} mt-3`} onClick={closePopup}>
                                        <Close height={15} />
                                    </div>
                                )}
                            </div>
                        </DialogTitle>
                    )}
                    {children}
                </div>

            </Dialog>
        </div>
    )
}

export default CustomPopover
