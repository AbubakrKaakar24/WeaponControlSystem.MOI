using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WeaponControlSystem.MOI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class cardNoAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CardNo",
                table: "Weapons",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "OfficerBadgeNo",
                table: "WeaponHandovers",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_WeaponHandovers_OfficerBadgeNo",
                table: "WeaponHandovers",
                column: "OfficerBadgeNo");

            migrationBuilder.AddForeignKey(
                name: "FK_WeaponHandovers_Officers_OfficerBadgeNo",
                table: "WeaponHandovers",
                column: "OfficerBadgeNo",
                principalTable: "Officers",
                principalColumn: "BadgeNo",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WeaponHandovers_Officers_OfficerBadgeNo",
                table: "WeaponHandovers");

            migrationBuilder.DropIndex(
                name: "IX_WeaponHandovers_OfficerBadgeNo",
                table: "WeaponHandovers");

            migrationBuilder.DropColumn(
                name: "CardNo",
                table: "Weapons");

            migrationBuilder.AlterColumn<string>(
                name: "OfficerBadgeNo",
                table: "WeaponHandovers",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}
