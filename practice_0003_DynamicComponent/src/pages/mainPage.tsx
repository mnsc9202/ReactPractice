import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Dayjs } from "dayjs";
import { useCallback, useState } from "react";
import CustomCalendar from "../component/customCalendar";
import CustomInput from "../component/customInput";
import { CustomSelectBox } from "../component/customSelectBox";
import CustomSelectMonth from "../component/customSelectMonth";
import {
  comprehensiveValueType,
  dataInfoType,
  selectBoxType,
  selectDateType,
} from "../type/type";
import {
  arrangeComprehensiveValue,
  parseFromDataInfo,
  createComprehensiveValue,
} from "../util/mainUtil";

export default function MainPage() {
  /*---------- info ----------*/
  // 변환할 데이터
  const [convertData, setConvertData] = useState<string>("");

  /*---------- info ----------*/
  // 종합 입력값
  const [comprehensiveValue, setComprehensiveValue] = useState<
    comprehensiveValueType[] | null
  >(null);

  /*---------- func ----------*/
  // 입력값 변경시
  const onChangeValue = useCallback(
    (id: string, value: string | Dayjs | selectDateType | selectBoxType) => {
      arrangeComprehensiveValue(
        comprehensiveValue!,
        setComprehensiveValue,
        id,
        value
      );
    },
    [comprehensiveValue]
  );

  // 데이터 입력시
  const onChangeConvertInputValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setConvertData(event.target.value);
    },
    []
  );

  // 변환버튼 클릭시
  const onConvertBtnClick = useCallback(() => {
    const parseData: dataInfoType[] | null = parseFromDataInfo(convertData);
    if (parseData) {
      createComprehensiveValue(parseData, setComprehensiveValue);
    } else {
      setComprehensiveValue(null);
    }
  }, [convertData]);

  return (
    <>
      <Grid container>
        {/* 입력(좌측) */}
        <Grid item xs={4} sx={{ padding: 1 }}>
          <Divider textAlign="left" sx={{ mt: 3, mb: 3 }}>
            데이터
          </Divider>

          {/* 데이터 입력 */}
          <Box sx={{ display: "flex" }}>
            <TextField
              error={comprehensiveValue ? false : true}
              value={convertData}
              onChange={onChangeConvertInputValue}
              fullWidth
              multiline
              autoFocus
              placeholder="[
                {label:string,
                name:string,
                type:input | calendar | selectMonth | selctBox}
              ]"
              helperText={comprehensiveValue ? "" : "양식대로 입력해주세요!"}
            />
            <Button
              onClick={onConvertBtnClick}
              variant="contained"
              color="secondary"
              sx={{
                marginBottom: comprehensiveValue ? 0 : "23px", // TextField helperText height
              }}
            >
              변환
            </Button>
          </Box>
        </Grid>
        {comprehensiveValue && (
          <>
            {/* 컴포넌트(우측)  */}
            <Grid item xs={8} sx={{ padding: 1 }}>
              <Divider textAlign="left" sx={{ mt: 3, mb: 3 }}>
                결과 컴포넌트
              </Divider>

              {/* 변환 결과 */}
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                {comprehensiveValue.map(
                  (el: comprehensiveValueType, i: number) => {
                    switch (el.dataInfo.type) {
                      case "input": {
                        return (
                          <CustomInput
                            key={el.id}
                            el={el}
                            onChangeValue={onChangeValue}
                          />
                        );
                      }
                      case "calendar": {
                        return (
                          <CustomCalendar
                            key={el.id}
                            el={el}
                            onChangeValue={onChangeValue}
                          />
                        );
                      }
                      case "selectMonth": {
                        return (
                          <CustomSelectMonth
                            key={el.id}
                            el={el}
                            onChangeValue={onChangeValue}
                          />
                        );
                      }
                      case "selectBox": {
                        return (
                          <CustomSelectBox
                            key={el.id}
                            el={el}
                            onChangeValue={onChangeValue}
                          />
                        );
                      }
                      default: {
                        return <></>;
                      }
                    }
                  }
                )}
              </Box>
            </Grid>

            {/* 결과(하단) */}
            <Grid item xs={12} sx={{ padding: 1 }}>
              <Divider textAlign="left" sx={{ mt: 5, mb: 3 }}>
                결과 상세
              </Divider>
              {/* 상세 */}
              {comprehensiveValue.length > 0 && (
                <TableContainer component={Paper}>
                  <Table>
                    {/* 테이블 항목 */}
                    <TableHead sx={{ bgcolor: "success.main" }}>
                      <TableRow>
                        {Object.keys(comprehensiveValue[0]).map(
                          (key: string) => {
                            return (
                              <TableCell
                                align="center"
                                key={key}
                                sx={{ color: "white" }}
                              >
                                {key}
                              </TableCell>
                            );
                          }
                        )}
                      </TableRow>
                    </TableHead>

                    {/* 테이블 내용 */}
                    <TableBody>
                      {Object.values(comprehensiveValue).map(
                        (el: comprehensiveValueType, i: number) => {
                          return (
                            <TableRow key={`${el.id}_${i}`}>
                              <TableCell>{el.id}</TableCell>
                              <TableCell>
                                {JSON.stringify(el.value, null, 2)}
                              </TableCell>
                              <TableCell>
                                {JSON.stringify(el.dataInfo, null, 2)}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}
