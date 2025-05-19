/* eslint-disable @typescript-eslint/no-explicit-any */
import { MantineSize, Select } from '@mantine/core';
import useGet from 'hooks/useGet';
import React, { FC, useEffect } from 'react';
import { enumToCamelCase, getObjValue } from 'utils';

interface Props {
  label?: string;
  placeholder?: string;
  value?: string;
  datasrc: string;
  accessorKey?: string;
  labelKey?: string;
  onChange?: (e: any) => void;
  disabled?: boolean;
  variant?: 'unstyled' | 'default' | 'filled' | 'outline';
  width?: number | string;
  setActive?: (data: any) => void;
  setData?: (data: any) => void;
  className?: string;
  px?: number;
  size?: MantineSize;
  required?: boolean;
  getLabel?: (data: any) => string;
  description?: string;
  filterData?: (data: any) => any;
  isMetrics?: boolean;
  isState?: boolean;
}

const AsyncSelect: FC<Props> = ({
  label,
  labelKey,
  accessorKey,
  placeholder,
  value,
  datasrc,
  onChange,
  disabled,
  setActive,
  setData,
  required,
  getLabel,
  description,
  isMetrics,
  isState,
  filterData,
}) => {
  const [selected, setSelected] = React.useState(value);
  const { data, loading } = useGet<any[]>(datasrc, {
    defaultData: [],
    swr: true,
  });
  const [selectedData, setSelectedData] = React.useState<any[]>([]);

  useEffect(() => {
    if (!data) return;
    console.log(data);
    let dataSet, newData, _data;
    if (Array.isArray(data)) {

      dataSet = new Set(data?.map((item) => JSON.stringify(item)));
      newData = [...dataSet].map((item) => JSON.parse(item));
      setData?.(newData);
      _data = (filterData ? filterData(newData) : newData) as any[];

    }
    else if (isState) {
      dataSet = (data as unknown as any).supportedCalculationFuelStates.map((item: any) => JSON.stringify(item));
      newData = [...dataSet].map((item) => JSON.parse(item));
      setData?.(newData);
      _data = (filterData ? filterData(newData) : newData) as any[];
    }
    else if (isMetrics) {
      dataSet = (data as unknown as any).supportedCalculationMetrics.map((item: any) => JSON.stringify(item));
      newData = [...dataSet].map((item) => JSON.parse(item));
      setData?.(newData);
      _data = (filterData ? filterData(newData) : newData) as any[];
    }
    else {
      dataSet = new Set((data as unknown as any)?.map((item: any) => JSON.stringify(item)));
      newData = [...dataSet].map((item: any) => JSON.parse(item));
      setData?.(newData);
      _data = (filterData ? filterData(newData) : newData) as any[];
    }




    const selectData = _data?.
      filter(item => item !== undefined && item !== null && (accessorKey ? item[accessorKey] !== undefined : true))
      .map((item) => ({
        value: String(accessorKey ? item?.[accessorKey] : item!),
        label:

          !labelKey && !getLabel
            ? enumToCamelCase(String(item?.toLowerCase()))
            : enumToCamelCase(getObjValue(labelKey ?? 'name', item!) ?? item?.[labelKey ?? 'name']),
      }));
    setSelectedData(selectData ?? []);
    const selected = _data?.find((item) => (accessorKey ? item?.[accessorKey] : item!) === value);
    setActive?.(selected);

    if (selected) {
      setSelected(accessorKey ? selected.id : selected!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessorKey, data, labelKey, value]);
  const loadingData = [{ value: 'loading', label: 'Loading...', disabled: true }];
  const noData = [{ value: '', label: 'NO DATA' }];
  return (
    <Select
      label={label}
      required={required}
      placeholder={placeholder}
      variant="unstyled"
      px={6}
      disabled={disabled}
      description={description}
      data={loading ? loadingData : (selectedData?.length  === 0 ) ? noData : selectedData}
      value={selected === '' ? 'N/A' : String(selected)}
      nothingFoundMessage="No data found"
      searchable
      size="sm"
      onChange={(e) => {
        if (e === 'N/A') {
          setActive?.(null);
          setSelected('');
          onChange?.(null);
          return;
        }
        const selected = isMetrics ? (data as unknown as any).supportedCalculationMetrics?.find((item: any) => (accessorKey ? item[accessorKey] : item) === e) : isState ? (data as unknown as any)?.supportedCalculationFuelStates?.find((item: any) => (accessorKey ? item[accessorKey] : item) === e) : data?.find((item) => accessorKey ? item[accessorKey!] === e : item === e);
        setActive?.(selected);
        setSelected(e!);
        onChange?.(e);
      }}
      classNames={{
        label: "!text-[14px] !font-medium !leading-[24.55px] text-black opacity-[80%]",
        input:
          "!my-[15px] !bg-input-fill !border-[1px] !border-input-border !py-[15px] !px-[12px] !rounded-[8px] !text-black !text-[14px] !font-bold !leading-[19.1px] !appearance-none !w-full !outline-none !min-h-[50px]",
        dropdown: "rounded-[8px] border border-input-border bg-input-fill shadow-none",
        option:
          "text-black text-[14px] font-bold leading-[19.1px] hover:bg-gray-100 px-[15px] !py-[10px]",
      }}
    />

  );
};

export default AsyncSelect;