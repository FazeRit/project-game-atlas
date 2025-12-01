import { memo } from "react";
import { ICompatibilityReportProps } from "../../model/interfaces/compatibility-report.interface";
import { CompatibilityReportFooter } from "../compatibility-report-footer";
import { useGetCompatibility } from "../../model";
import { CustomBadge } from "@/shared/components";

export const CompatibilityReport = memo((props: ICompatibilityReportProps) => {
    const {
        game
    } = props;

    const { data: report } = useGetCompatibility(game.checksum);

    const compatibilityScore = report?.data?.compatibilityScore;
    const greenFlags = report?.data?.greenFlags || [];
    const redFlags = report?.data?.redFlags || [];

    return (
        <div className="flex flex-col gap-6 md:gap-8">
            <div className="flex flex-col items-center gap-2 bg-[#1f1f1f] shadow-lg p-6 rounded-lg">
                <p className="font-extrabold text-white text-6xl">
                    {compatibilityScore}%
                </p>
                <p className="text-[#a3a3a3] text-lg">
                    Оцінка сумісності
                </p>
                <div className="bg-[#3a3a3a] mt-2 rounded-full w-full h-2">
                    <div 
                        className="bg-green-400 rounded-full h-2 transition-all duration-500" 
                        style={{ width: `${compatibilityScore}%` }} 
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <p className="font-semibold text-white text-base">
                    Зелені прапорці 
                </p>
                <div className="flex flex-wrap gap-2">
                    {greenFlags.length > 0 ? (
                        greenFlags.map((item, index) => (
                            <CustomBadge
                                name={item ?? ''}
                                key={item ?? index.toString()}
                            />
                        ))
                    ) : (
                        <p className="text-[#a3a3a3] text-sm italic">
                            Немає знайдених значних збігів інтересів.
                        </p>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <p className="font-semibold text-white text-base">
                    Червоні прапорці 
                </p>
                <div className="flex flex-wrap gap-2">
                    {redFlags.length > 0 ? (
                        redFlags.map((item, index) => (
                            <CustomBadge
                                name={item ?? ''}
                                key={item ?? index.toString()}
                            />
                        ))
                    ) : (
                        <p className="text-green-400 text-sm italic">
                            Відсутні значні конфлікти інтересів.
                        </p>
                    )}
                </div>
            </div>

            <CompatibilityReportFooter
                game={game}
            />
        </div>
    )
})