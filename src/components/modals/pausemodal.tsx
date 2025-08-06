import React from "react";
import { Modal, TimePicker, Typography, Input, DatePicker, Space, Alert } from "antd";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { calculateWorkingMinutesBetween } from "@/pages/ProductionPlanning/dateschedule-utils";
import { WorkingHoursConfig } from "@/pages/ProductionPlanning/productioncalendartypes";

const { Text, Title } = Typography;

interface PauseModalProps {
    selectedPausePpOrderId: number | null;
    selectedPausePpOrderTitle: string | null;
    open: boolean;
    start: Dayjs | null;
    end: Dayjs | null;
    comment: string;
    onChangeStart: (time: Dayjs) => void;
    onChangeEnd: (time: Dayjs) => void;
    onChangeComment: (val: string) => void;
    onCancel: () => void;
    onOk: () => void;
    // Optional: Allow date selection for pauses on different days
    allowDateSelection?: boolean;
    // Optional: Show validation errors
    showValidation?: boolean;
    dailyWorkingHours: Record<string, WorkingHoursConfig>;
    defaultWorkingHours: Record<number, WorkingHoursConfig>;
}

export const PauseModal: React.FC<PauseModalProps> = ({
    selectedPausePpOrderId,
    selectedPausePpOrderTitle,
    open,
    start,
    end,
    comment,
    onChangeStart,
    onChangeEnd,
    onChangeComment,
    onCancel,
    onOk,
    allowDateSelection = true,
    showValidation = true,
    dailyWorkingHours,
    defaultWorkingHours,
}) => {
    // Helper function to get the current date or use provided date
    const getCurrentOrProvidedDate = (dateTime: Dayjs | null): Dayjs => {
        return dateTime || dayjs();
    };

    // Validation helpers
    const hasValidTimes = start && end;
    const isEndAfterStart = hasValidTimes && end!.isAfter(start!);
    const hasSelectedOrder = selectedPausePpOrderId !== null;
    const canSubmit = hasValidTimes && isEndAfterStart && hasSelectedOrder;

    // Calculate pause duration in minutes
    const pauseDurationMinutes = hasValidTimes && isEndAfterStart 
        ? calculateWorkingMinutesBetween(start!, end!, dailyWorkingHours, defaultWorkingHours)
        : 0;

    const handleDateChange = (date: Dayjs | null, timeType: 'start' | 'end') => {
        if (!date) return;
        
        const currentTime = timeType === 'start' ? start : end;
        if (currentTime) {
            // Preserve the time, update the date
            const newDateTime = date
                .hour(currentTime.hour())
                .minute(currentTime.minute())
                .second(0)
                .millisecond(0);
            
            if (timeType === 'start') {
                onChangeStart(newDateTime);
            } else {
                onChangeEnd(newDateTime);
            }
        }
    };

    const handleTimeChange = (time: Dayjs | null, timeType: 'start' | 'end') => {
        if (!time) return;
        
        const currentDateTime = timeType === 'start' ? start : end;
        const baseDate = getCurrentOrProvidedDate(currentDateTime);
        
        // Combine the date with the new time
        const newDateTime = baseDate
            .hour(time.hour())
            .minute(time.minute())
            .second(0)
            .millisecond(0);
        
        if (timeType === 'start') {
            onChangeStart(newDateTime);
        } else {
            onChangeEnd(newDateTime);
        }
    };

    return (
        <Modal 
            open={open} 
            onCancel={onCancel} 
            onOk={onOk} 
            title="Δημιουργία Παύσης"
            okText="Δημιουργία"
            cancelText="Ακύρωση"
            okButtonProps={{ disabled: !canSubmit }}
            width={500}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* PPOrder Info */}
                <div style={{ padding: "12px", backgroundColor: "#f5f5f5", borderRadius: "6px" }}>
                    <Title level={4} style={{ margin: 0, color: "#1890ff" }}>
                        Μάστερ: {selectedPausePpOrderTitle || "Δεν επιλέχθηκε"}
                    </Title>
                    {selectedPausePpOrderId && (
                        <Text type="secondary">ID: {selectedPausePpOrderId}</Text>
                    )}
                </div>

                {/* Date Selection (if enabled) */}
                {allowDateSelection && (
                    <div>
                        <Text strong>Ημερομηνία:</Text>
                        <Space style={{ marginTop: 8, width: "100%" }}>
                            <div>
                                <Text>Έναρξη:</Text>
                                <DatePicker
                                    value={start}
                                    onChange={(date) => handleDateChange(date, 'start')}
                                    format="DD/MM/YYYY"
                                    placeholder="Επιλογή ημερομηνίας"
                                />
                            </div>
                            <div>
                                <Text>Λήξη:</Text>
                                <DatePicker
                                    value={end}
                                    onChange={(date) => handleDateChange(date, 'end')}
                                    format="DD/MM/YYYY"
                                    placeholder="Επιλογή ημερομηνίας"
                                />
                            </div>
                        </Space>
                    </div>
                )}

                {/* Time Selection */}
                <div>
                    <Text strong>Ώρα:</Text>
                    <Space style={{ marginTop: 8 }}>
                        <div>
                            <Text>Έναρξη:</Text>
                            <TimePicker
                                value={start}
                                format="HH:mm"
                                onChange={(time) => handleTimeChange(time, 'start')}
                                placeholder="--:--"
                                showNow={false}
                            />
                        </div>
                        <div>
                            <Text>Λήξη:</Text>
                            <TimePicker
                                value={end}
                                format="HH:mm"
                                onChange={(time) => handleTimeChange(time, 'end')}
                                placeholder="--:--"
                                showNow={false}
                            />
                        </div>
                        {pauseDurationMinutes > 0 && (
                            <div style={{ marginLeft: 16 }}>
                                <Text type="secondary">
                                    Διάρκεια: {dayjs.duration(pauseDurationMinutes, "minutes").format("HH:mm")} {/* Format as HH:mm */}
                                         
                                </Text>
                            </div>
                        )}
                    </Space>
                </div>

                {/* Validation Messages */}
                {showValidation && (
                    <div>
                        {!hasSelectedOrder && (
                            <Alert
                                message="Παρακαλώ επιλέξτε ένα μάστερ για την παύση"
                                type="warning"
                                showIcon
                                style={{ marginBottom: 8 }}
                            />
                        )}
                        {hasValidTimes && !isEndAfterStart && (
                            <Alert
                                message="Η ώρα λήξης πρέπει να είναι μετά την ώρα έναρξης"
                                type="error"
                                showIcon
                                style={{ marginBottom: 8 }}
                            />
                        )}
                    </div>
                )}

                {/* Comment */}
                <div>
                    <Text strong>Σχόλιο:</Text>
                    <Input.TextArea
                        rows={3}
                        value={comment}
                        placeholder="Προσθήκη σχολίου για την παύση..."
                        onChange={(e) => onChangeComment(e.target.value)}
                        style={{ marginTop: 8 }}
                        maxLength={500}
                        showCount
                    />
                </div>

                {/* Summary */}
                {canSubmit && (
                    <div style={{ 
                        padding: "12px", 
                        backgroundColor: "#f6ffed", 
                        border: "1px solid #b7eb8f",
                        borderRadius: "6px" 
                    }}>
                        <Text strong style={{ color: "#52c41a" }}>Περίληψη:</Text>
                        <div style={{ marginTop: 4 }}>
                            <Text>
                                Παύση για {selectedPausePpOrderTitle} από{" "}
                                {start!.format("DD/MM/YYYY HH:mm")} έως{" "}
                                {end!.format("DD/MM/YYYY HH:mm")} ({pauseDurationMinutes} λεπτά)
                            </Text>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default PauseModal;